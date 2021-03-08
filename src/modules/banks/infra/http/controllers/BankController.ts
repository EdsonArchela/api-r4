import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBankService from '../../../services/CreateBankService';
import ReadBankService from '../../../services/ReadBankService';
export default class BankController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, bankNumber, agency, account, iban, ownerUser } = request.body;
    const createBankService = container.resolve(CreateBankService);
    const bank = await createBankService.execute({
      ownerUser,
      name,
      bankNumber,
      account,
      agency,
      iban,
    });

    return response.json(bank);
  }

  public async read(request: Request, response: Response): Promise<Response> {
    const selected = request.query.selected as string;

    const readBankService = container.resolve(ReadBankService);
    const bank = await readBankService.execute(selected);

    return response.json(bank);
  }
}
