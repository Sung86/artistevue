<template>
  <div>
    <div>Address</div>
    <v-form ref="form" lazy-validation>
      Address Line 1
      <v-text-field
        v-model="addressForm.addressLine1"
        :rules="addressLine1Rules"
        required
        outlined
      />
      Address Line 2
      <v-text-field
        v-model="addressForm.addressLine2"
        :rules="addressLine2Rules"
        outlined
      />
      City
      <v-text-field
        v-model="addressForm.city"
        :rules="cityRules"
        required
        outlined
      />
      State/Province/Region
      <v-text-field
        v-model="addressForm.state"
        :rules="stateRules"
        required
        outlined
      />
      ZIP/Postal Code
      <v-text-field
        v-model="addressForm.zip"
        :rules="zipRules"
        required
        outlined
      />
      Country
      <v-select
        v-model="addressForm.country"
        :rules="countryRules"
        :items="countryList"
        outlined
        :menu-props="{ bottom: true, offsetY: true }"
      ></v-select>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["isCollectForms", "isValidateForms"],
  watch: {
    isCollectForms(newVal) {
      if (newVal === true) this.$emit("addressDetails", this.addressForm);
    },
    isValidateForms(newVal) {
      if (newVal === true) {
        const hasAnyError = this.$refs.form.validate();
        this.$emit("hasAnyError", hasAnyError);
      }
    }
  },
  data: () => ({
    addressLine1Rules: [
      v => !!v || "Address line 1 is requried.",
      v =>
        (v && v.length >= 1 && v.length <= 25) ||
        "Address must be between 1 and 25 characters"
    ],
    addressLine2Rules: [
      v =>
        /^[a-zA-Z]{0,25}$/.test(v) ||
        "Address must be between 0 and 25 characters"
    ],
    cityRules: [
      v => !!v || "City is requried",
      v =>
        (v && v.length >= 1 && v.length <= 25) ||
        "City must be between 1 and 25 characters"
    ],
    stateRules: [
      v => !!v || "State/Province/Region is requried",
      v =>
        (v && v.length >= 1 && v.length <= 25) ||
        "State/Province/Region must be between 1 and 25 characters"
    ],
    zipRules: [
      v => !!v || "ZIP/Postal Code is requried",
      v =>
        /^[0-9]{1,10}$/.test(v) || "ZIP/Postal must be between 1 to 10 digits"
    ],
    countryRules: [v => !!v || "Country is requried"],

    addressForm: {
      addressLine1: null,
      addressLine2: null,
      city: null,
      state: null,
      zip: null,
      country: null
    },
    countryList: [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua & Deps",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Central African Rep",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Ivory Coast",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea North",
      "Korea South",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "St Kitts & Nevis",
      "St Lucia",
      "Saint Vincent & the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome & Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Tonga",
      "Trinidad & Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ]
  })
};
</script>
