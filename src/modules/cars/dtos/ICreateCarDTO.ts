interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: string;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

export { ICreateCarDTO };