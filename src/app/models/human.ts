export class Human {

  constructor(
            birthLocationLabel: string,
            date_of_birth: string,
            height: string,
            spouseLabel:string,
            itemLabel:string) {
                this.BirthLocation = birthLocationLabel;

                if(date_of_birth != null && date_of_birth.length !=0)
                {
                  this.DateOfBirth = new Date(date_of_birth);
                }

                if(height != null && height.length !=0)
                {
                  this.Height = Number(height);
                }

                this.SpouseName = spouseLabel;
                this.Title = itemLabel;
  }

  BirthLocation: string;
  DateOfBirth?: Date;
  Height?: number;
  SpouseName: string;
  Title: string;
}
