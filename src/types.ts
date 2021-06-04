type TContext = {
  token: string;
}

export type TCustomAuthChecker = {
  root: any;
  args: any;
  context: TContext;
  info: any;
}