import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBankService from '../../../services/CreateBankService';

export default class BankController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, bankNumber, agency, account, iban } = request.body;

    const createBankService = container.resolve(CreateBankService);
    const bank = await createBankService.execute({
      userId,
      name,
      bankNumber,
      account,
      agency,
      iban,
    });

    return response.json(bank);
  }
}
