export enum RoleEnum {
  ADMINISTRATOR = "5df9ec0f6d0d11ea98e20ee7c6890289",
  SUPERVISOR = "689dde8b6d0d11ea98e20ee7c6890289",
  SELLER = "129c9e8b93a542569c7314b08fac29ca"
}

export namespace RoleEnum {
  export function getName(value: string) {
      switch (value) {
          case RoleEnum.ADMINISTRATOR: return "Administrador";
          case RoleEnum.SUPERVISOR: return "Supervisor";
          case RoleEnum.SELLER: return "Vendedor";
          default: return undefined;
      }
  }

  export function toArray() {
      return [
          {
              id: RoleEnum.ADMINISTRATOR,
              name: RoleEnum.getName(RoleEnum.ADMINISTRATOR)
          },
          {
              id: RoleEnum.SUPERVISOR,
              name: RoleEnum.getName(RoleEnum.SUPERVISOR)
          },
          {
              id: RoleEnum.SELLER,
              name: RoleEnum.getName(RoleEnum.SELLER)
          }
      ];
  }
}
