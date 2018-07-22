export class Human {

  constructor(
            birthLocationLabel: string,
            country_of_citizenship: string,
            country_of_citizenshipLabel: string,
            date_of_birth: string,
            description: string,
            height: string,
            image: string,
            IMDb_ID: string,
            sex_or_genderLabel:string,
            spouse:string,
            spouseLabel:string,
            itemLabel:string,
            residence:string,
            educatedAt:string) {
              this.BirthLocation = birthLocationLabel;
              this.CountryOfCitizenship = country_of_citizenship;
              this.CountryOfCitizenshipLabel = country_of_citizenshipLabel;
              if(date_of_birth != null && date_of_birth.length !=0)
              {
                this.DateOfBirth = new Date(date_of_birth);
              }
              this.Description = description;
              if(height != null && height.length !=0)
              {
                this.Height = Number(height);
              }
              this.Image = image;
              this.IMDB_Id = IMDb_ID;

              if(spouse != null && spouse.length >0)
              {
                this.SpouseHasWiki = true;
              }
              else{
                this.SpouseHasWiki = false;
              }
              this.Sex = sex_or_genderLabel;
              this.SpouseName = spouseLabel;
              this.Title = itemLabel;
              this.Residence = residence;
              this.EducatedAt = educatedAt;
  }

  BirthLocation: string;
  CountryOfCitizenship: string;
  CountryOfCitizenshipLabel: string;
  DateOfBirth?: Date;
  Description: string;
  Height?: number;
  Image: string;
  IMDB_Id: string;
  Sex: string;
  SpouseHasWiki: boolean;
  SpouseName: string;
  Title: string;
  EducatedAt: string;
  Residence: string;
}