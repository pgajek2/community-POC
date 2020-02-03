import { LightningElement, track } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class WholeForm extends LightningElement {
  @track activeSectionMessage = "";
  @track currentUserObject = {};
  @track activeSections = [];
  main_info = [
    "Hotel_Property_Code__c",
    "Name",
    "Title__c",
    "Telephone_Number__c",
    "Salutation__c",
    "Date_Submited__c",
    "Email_Address__c"
  ];
  // accordion_sections = ['General Info','Hotel_Fetures','Hotel Overview"','Insider’s Tips','Why go now','Dining','SPA','Submitter contact information'];
  fields_per_section = [
    {
      label: "General Info",
      subSections: [
        {
          sublabel: "General Manager",
          fields: [
            "Manager_Salutation__c",
            "General_Manager_Name__c",
            "General_Manager_Email_Address__c"
          ]
        },
        {
          sublabel: "Communications",
          fields: [
            "Country_Code__c",
            "Area_Code__c",
            "General_Telephone_Number__c",
            "Fax_Number__c"
          ]
        },
        {
          sublabel: "Hotel Coordinates",
          fields: ["Longitude__c", "Latitude__c"]
        },
        {
          sublabel: "Rooms",
          fields: [
            "Number_of_Guest_Rooms__c",
            "Number_of_Suites__c",
            "Number_of_Villas__c",
            "Number_of_Cottages__c"
          ]
        },
        {
          sublabel: "Property Search",
          fields: ["Property_Search__c"]
        }
      ]
    },
    {
      label: "Hotel Features",
      subSections: [
        {
          sublabel: "",
          fields: ["Hotel_Features__c"]
        },
        {
          sublabel: "",
          fields: ["Hotel_Must_Haves__c"]
        },
        {
          sublabel: "",
          fields: ["Additional_Hotel_Features__c"]
        }
      ]
    },
    {
      label: "Hotel Overview",
      subSections: [
        {
          sublabel: "",
          fields: [
            "Hotel_Main_Image__c",
            "Rooms_Main_Page_Image__c",
            "Offers_Main_Page_Image__c",
            "Overview_Description__c"
          ]
        },
        {
          sublabel: "Property Highlights",
          fields: [
            "Property_HighLights__c",
            "HighLight_Description__c",
            "Associated_Image_Id_from_Vscape__c"
          ]
        }
      ]
    },
    {
      label: "Insiders' Tips",
      subSections: [
        {
          sublabel: "",
          fields: [
            "Best_City_Secrets__c",
            "Best_View__c",
            "Best_Restaurant_for_a_Celebration__c",
            "Best_Restaurant_Classic__c",
            "Best_Cocktail_with_a_View__c",
            "Best_City_Newcomer__c",
          ]
        }
      ]
    },
    {
      label: "Why go now",
      subSections: [
        {
          sublabel: "Event 1",
          fields: [
            "Name_Of_Event1__c",
            "Address_or_Location1__c",
            "Start_Date1__c",
            "End_Date1__c",
            "Description1__c"
          ]
        },
        {
          sublabel: "Event 2",
          fields: [
            "Name_Of_Event2__c",
            "Address_or_Location2__c",
            "Start_Date2__c",
            "End_Date2__c",
            "Description2__c"
          ]
        },
        {
          sublabel: "Event 3",
          fields: [
            "Name_Of_Event3__c",
            "Address_or_Location3__c",
            "Start_Date3__c",
            "End_Date3__c",
            "Description3__c"
          ]
        },
      ]
    },
    {
      label: "Dining",
      subSections: [
        {
          sublabel: "",
          fields: [
            "Dining_Main_Page_Image__c"
          ]
        },
        {
          sublabel: "Restaurant 1",
          fields: [
            "Restaurant_Name__c",
            "Description_Restaurant__c",
            "Executive_Chief__c",
            "Restaurant_General_Manager__c",
            "Hours_of_Operation__c",
            "For_Reservation_Call__c",
            "Addres_Restaurant__c",
            "Quote_Review__c",
            "Name_of_Persion_Quoted__c",
            "Retaurant_Photo__c",
            "Menu__c",
          ]
        }
      ]
    },
    {
      label: "SPA",
      subSections: [
        {
          sublabel: "",
          fields: [
            "Spa_Main_Page_Image__c",
            "Spa_Name__c",
            "Spa_Overview__c",
          ]
        },
        {
          sublabel: "Services & Fitness",
          fields: [
            "Treatments__c",
            "Classes__c",
            "Additional_Features__c",
          ]
        }
      ]
    },
    {
      label: "Golf",
      subSections: [
        {
          sublabel: "",
          fields: [
            "Golf_Main_Page_Image__c",
          ]
        },
        {
          sublabel: "Golf Course 1",
          fields: [
            "Golf_Description__c",
            "Weekday_Hours__c",
            "Weekend_Hours__c",
            "Guarantee_Tea_Time__c",
            "For_Tee_Time_Call__c",
            "Distance_From_Hotel_In_Kilometers__c",
            "Distance_From_Hotel_In_Miles__c",
          ]
        }
      ]
    }
  ];

  handleToggleSection(event) {
    this.activeSectionMessage =
      "Open section name:  " + event.detail.openSections;
  }

  handleSetActiveSectionC() {
    const accordion = this.template.querySelector(".example-accordion");
    accordion.activeSectionName = "C";
  }

  handleChange(event) {
    console.log(event.target.fieldName);
    console.log(event.target.value);
    this.currentUserObject[event.target.fieldName] = event.target.value;
  }

  handleCancel(event) {
      const inputFields = this.template.querySelectorAll(
          'lightning-input-field'
      );
      if (inputFields) {
          inputFields.forEach(field => {
              field.reset();
          });
  }
}

  handleSuccess() {
    const event = new ShowToastEvent({
      variant: 'success',
      title: 'Success!',
      message: 'Record has been created',
    });
    this.dispatchEvent(event);
  }
}