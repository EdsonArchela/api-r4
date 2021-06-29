import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateEnterpriseService from '../../../services/AuthenticateEnterpriseService';
import CreateEnterpriseService from '../../../services/CreateEnterpriseService';

export default class EnterprisesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { documment, email, password } = request.body;

    const createEnterpriseService = container.resolve(CreateEnterpriseService);

    const enterprise = await createEnterpriseService.execute({
      documment,
      email,
      password,
    });

    return response.json(classToClass(enterprise));
  }

  public async authorize(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { documment, password } = request.body;

    const authenticate = container.resolve(AuthenticateEnterpriseService);

    const { enterprise, token } = await authenticate.execute({
      documment,
      password,
    });

    return response.json({ enterprise: classToClass(enterprise), token });
  }
}
