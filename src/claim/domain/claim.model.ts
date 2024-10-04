export class Claim {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly pointValue: number,
    public readonly customerId: string,
  ) {}
}
