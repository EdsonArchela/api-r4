import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import fetch from 'node-fetch';
import moment from 'moment';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  bank: string;
  currency: string;
  direction: boolean;
  value: number;
  otc: number;
  spread: number;
  iof?: number;
  ptax2?: number;
  ir?: number;
  user_id: string;
  darf: boolean;
}

interface IResponse {
  clientQuote: number;
  contract: number;
  ptaxD1?: number;
  cet: number;
  assFee: number;
  darf?: number;
}

function getPreviousWorkday(): moment.Moment {
  const workday = moment();
  const day = workday.day();
  let diff = 1; // returns yesterday
  if (day === 0 || day === 1) {
    // is Sunday or Monday
    diff = day + 2; // returns Friday
  }
  return workday.subtract(diff, 'days');
}

@injectable()
export default class SimulateDealService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    bank,
    currency,
    direction,
    value,
    otc,
    spread,
    iof,
    ptax2,
    ir,
    user_id,
    darf,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const client = direction ? otc - spread : otc + spread;

    const clientContract = () => {
      switch (bank) {
        case 'ourinvest':
          return 100;
        case 'moneycorp':
          return 10 * client;
        default:
          return 50 * client;
      }
    };
    // valor da operação em R$
    let cet = value * client;

    let contract: number;

    // cálculo do contrato em R$
    let ptax:
      | {
          cotacaoVenda: number;
        }
      | undefined;

    if (bank === 'travelex' || bank === 'moneycorp') {
      const response = await fetch(
        'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/' +
          "CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" +
          getPreviousWorkday().format('MM-DD-YYYY') +
          "'&$top=100&$format=json&$select=cotacaoVenda",
      );
      const data = await response.json();
      ptax = data.value[0];
      
      console.log('SIMULATEDEALSERVICE LOG',bank, currency, ptax);
      const cost =
        ptax && currency !== 'USD'
          ? (ptax.cotacaoVenda * clientContract()) / client
          : clientContract();
      contract = cost;
    } else contract = clientContract();

    // calculo IOF
    const m_iof = (cet * (iof ? iof : 0)) / 100;

    // cálculo IR
    const m_ir =
      (value *
        (ptax2 ? (ptax2 > client ? ptax2 : client) : client) *
        (ir || 0)) /
      100;

    if (direction) cet += -m_ir - m_iof - contract;
    else cet += m_ir + m_iof + contract;

    const assFee = value * spread * (user.comission || 0);

    return {
      clientQuote: client,
      contract,
      ptaxD1: ptax?.cotacaoVenda && undefined,
      cet: darf ? (direction ? cet + m_ir : cet - m_ir) : cet,
      assFee,
      darf: darf ? m_ir : 0,
    };
  }
}
