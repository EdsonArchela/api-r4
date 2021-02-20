import SimulateDealService from '../services/SimulateDealService';
import fetch from 'node-fetch';
import moment from 'moment';

let simulateDealService: SimulateDealService;

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

describe('SimulateDealService', () => {
  beforeEach(() => {
    simulateDealService = new SimulateDealService();
  });

  it('should be able to calculate an Import', async () => {
    const bank = 'Travelex';
    let currency = 'USD';
    const direction = false;
    const value = 50000;
    const otc = 5.3567;
    const spread = 0.03;

    let result = await simulateDealService.execute({
      bank,
      currency,
      direction,
      value,
      otc,
      spread,
    });

    expect(result).toEqual({
      clientQuote: otc + spread,
      contract: 50 * (otc + spread),
      cet: value * (otc + spread) + 50 * (otc + spread),
      ptaxD1: undefined,
      assFee: value * spread * 0.4,
    });

    currency = 'EUR';

    result = await simulateDealService.execute({
      bank,
      currency,
      direction,
      value,
      otc,
      spread,
    });

    const response = await fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${getPreviousWorkday().format(
        'MM-DD-YYYY',
      )}'&$top=100&$format=json&$select=cotacaoVenda`,
    );
    const data = await response.json();
    const { cotacaoVenda } = data.value[0];

    expect(result.clientQuote).toBe(otc + spread);
    expect(result.cet).toBe(
      value * (otc + spread) +
        50 * (cotacaoVenda > otc + spread ? cotacaoVenda : otc + spread),
    );
    expect(result.contract).toBe(
      50 * (cotacaoVenda > otc + spread ? cotacaoVenda : otc + spread),
    );
    expect(result.assFee).toBe(value * spread * 0.4);
  });

  it('should be able to calculate an Export', async () => {
    const bank = 'Travelex';
    let currency = 'USD';
    const direction = true;
    const value = 50000;
    const otc = 5.3567;
    const spread = 0.03;

    let result = await simulateDealService.execute({
      bank,
      currency,
      direction,
      value,
      otc,
      spread,
    });

    expect(result).toEqual({
      clientQuote: otc - spread,
      contract: 50 * (otc - spread),
      cet: value * (otc - spread) - 50 * (otc - spread),
      ptaxD1: undefined,
      assFee: value * spread * 0.4,
    });

    currency = 'EUR';

    result = await simulateDealService.execute({
      bank,
      currency,
      direction,
      value,
      otc,
      spread,
    });

    const response = await fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${getPreviousWorkday().format(
        'MM-DD-YYYY',
      )}'&$top=100&$format=json&$select=cotacaoVenda`,
    );
    const data = await response.json();
    const { cotacaoVenda } = data.value[0];

    expect(result.clientQuote).toBe(otc - spread);
    expect(result.cet).toBe(
      value * (otc - spread) -
        50 * (cotacaoVenda > otc - spread ? cotacaoVenda : otc - spread),
    );
    expect(result.contract).toBe(
      50 * (cotacaoVenda > otc - spread ? cotacaoVenda : otc - spread),
    );
    expect(result.assFee).toBe(value * spread * 0.4);
  });

  it('should be able to calculate an Disponibilidade de Entrada', async () => {
    const bank = 'Travelex';
    let currency = 'USD';
    const direction = true;
    const value = 50000;
    const otc = 5.3567;
    const spread = 0.03;
    const iof = 0.38;

    let result = await simulateDealService.execute({
      bank,
      currency,
      direction,
      value,
      otc,
      spread,
      iof,
    });

    expect(result).toEqual({
      clientQuote: otc - spread,
      contract: 50 * (otc - spread),
      cet:
        value * (otc - spread) -
        (value * (otc - spread) * iof) / 100 -
        50 * (otc - spread),
      ptaxD1: undefined,
      assFee: value * spread * 0.4,
    });

    currency = 'EUR';

    result = await simulateDealService.execute({
      bank,
      currency,
      direction,
      value,
      otc,
      spread,
      iof,
    });

    const response = await fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${getPreviousWorkday().format(
        'MM-DD-YYYY',
      )}'&$top=100&$format=json&$select=cotacaoVenda`,
    );
    const data = await response.json();
    const { cotacaoVenda } = data.value[0];

    expect(result.clientQuote).toBe(otc - spread);
    expect(result.cet).toBe(
      value * (otc - spread) -
        (value * (otc - spread) * iof) / 100 -
        50 * (cotacaoVenda > otc - spread ? cotacaoVenda : otc - spread),
    );
    expect(result.contract).toBe(
      50 * (cotacaoVenda > otc - spread ? cotacaoVenda : otc - spread),
    );
    expect(result.assFee).toBe(value * spread * 0.4);
  });
});
