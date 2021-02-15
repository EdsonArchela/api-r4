import Permission from '../infra/typeorm/entities/Permissions';

export default interface IRolesDTO {
  name: string;
  description: string;
  permissions: Permission[];
}
