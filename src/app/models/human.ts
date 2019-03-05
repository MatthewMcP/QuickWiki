export class Human {

  constructor(
            itemReF: string,
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
            educatedAt:string,
            educatedAtLabel:string,
            residence:string,
            residenceLabel:string) {
              this.ItemReF = itemReF;
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
              this.EducatedAt = educatedAt;
              this.EducatedAtLabel = educatedAtLabel;
              this.Residence = residence;
              this.ResidenceLabel = residenceLabel;
  }

  ItemReF: string;
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
  EducatedAtLabel: string;
  Residence: string;
  ResidenceLabel: string;
}
