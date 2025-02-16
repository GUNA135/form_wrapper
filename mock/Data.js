export const metaData = {
    'id': '1',
    'wrapper': false,
    'allOptions': {
        'tab': [
            {
                'label': 'Primary Details',
                'value': 'PrimaryDetails'
            },
            {
                'label': 'Other Details',
                'value': 'otherDetails'
            },
            {
                'label': 'Address Details',
                'value': 'addressDetails'
            },
            {
                'label': 'Members Allocation',
                'value': 'membersAllocation'
            },
        ],
        'gender': [
            {
                'label': 'Male',
                'value': 'male'
            },
            {
                'label': 'Female',
                'value': 'female'
            },
        ],
        "occupation": [
            {
                'label': 'Employed',
                'value': 'employed'
            },
            {
                'label': 'Self Employed',
                'value': 'selfEmployed'
            },
            {
                'label': 'Student',
                'value': 'student'
            },
            {
                'label': 'Un Employed',
                'value': 'unEmployed'
            },
            {
                'label': 'Retired',
                'value': 'retired'
            }
        ],
        "states": [
            { "label": "Tamil Nadu", "value": "tamilNadu" },
            { "label": "Karnataka", "value": "karnataka" },
            { "label": "Maharashtra", "value": "maharashtra" },
            { "label": "Uttar Pradesh", "value": "uttarPradesh" }
        ],
        "tamilNadu": [
            { "label": "Chennai", "value": "chennai" },
            { "label": "Coimbatore", "value": "coimbatore" },
            { "label": "Madurai", "value": "madurai" },
            { "label": "Tiruchirappalli", "value": "tiruchirappalli" },
            { "label": "Salem", "value": "salem" }
        ],
        "karnataka": [
            { "label": "Bengaluru Urban", "value": "bengaluruUrban" },
            { "label": "Mysuru", "value": "mysuru" },
            { "label": "Mangaluru", "value": "mangaluru" },
            { "label": "Hubballi-Dharwad", "value": "hubballiDharwad" },
            { "label": "Shivamogga", "value": "shivamogga" }
        ],
        "maharashtra": [
            { "label": "Mumbai Suburban", "value": "mumbaiSuburban" },
            { "label": "Pune", "value": "pune" },
            { "label": "Nagpur", "value": "nagpur" },
            { "label": "Nashik", "value": "nashik" },
            { "label": "Aurangabad", "value": "aurangabad" }
        ],
        "uttarPradesh": [
            { "label": "Lucknow", "value": "lucknow" },
            { "label": "Varanasi", "value": "varanasi" },
            { "label": "Kanpur Nagar", "value": "kanpurNagar" },
            { "label": "Agra", "value": "agra" },
            { "label": "Allahabad", "value": "allahabad" }
        ]
    },
    'section': [
        {
            'wrapper': false,
            'fields': [
                {
                    'component': 'tab',
                    'options': 'tab',
                    'position': 'center',
                    'name': 'tab',
                    'turnOffFunc': true,
                }
            ]
        },
        {
            'dependsOn': {
                'target': 'tab',
                'values': [0]
            },
            'layout': 'grid grid-cols-3 gap-x-6 gap-y-8 py-8',
            'wrapper': true,
            'section_id': 'personal_details',
            'fields': [
                {
                    'component': 'input',
                    'type': 'text',
                    'name': 'name',
                    'label': 'Name',
                    'placeholder': 'Enter the name',
                    'required': true,
                    'validation': {
                        'message': 'Enter the name'
                    }
                },
                {
                    'component': 'input',
                    'type': 'email',
                    'name': 'email',
                    'label': 'Email',
                    'placeholder': 'Enter the email',
                    'required': true,
                    'validation': {
                        'regex': '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
                        'message': 'Enter Valid Email'
                    }
                },
                {
                    'component': 'radio',
                    'name': 'gender',
                    'label': 'Gender',
                    'options': 'gender',
                    'required': true,
                },
                {
                    'component': 'input',
                    'type': 'date',
                    'name': 'date_of_birth',
                    'label': 'DOB',
                    'required': true,
                    'validation': {
                        'message': 'Enter Valid Date Of Birth'
                    }
                },
                {
                    'component': 'input',
                    'type': 'number',
                    'name': 'mobile',
                    'label': 'Mobile',
                    'placeholder': 'Enter the mobile'
                },
            ],
            'buttons':
                [
                    {
                        'label': 'Next',
                        'target': 'tab',
                        'targettedFunction': 'next',
                        'varient': 'primary',
                        'options': 'tab',
                        'section_id': 'personal_details',
                    },
                ]
        },
        {
            'dependsOn': {
                'target': 'tab',
                'values': [1]
            },
            'layout': 'grid grid-cols-2 gap-x-6 gap-y-4 py-6',
            'wrapper': true,
            'section_id': 'other_details',
            'fields': [
                {
                    'component': 'input',
                    'type': 'number',
                    'name': 'annualIncome',
                    'label': 'Annual Income',
                    'placeholder': 'Enter the annual income',
                    'required': true,
                    'reset': {
                        'target': 'payslip',
                    },
                    'validation': {
                        'regex': '^\\d+(\\.\\d+)?$',
                        'message': 'Please Enter Income',
                        'length': {
                            'min': 5,
                            'max': 20
                        }
                    }
                },
                {
                    'component': 'select',
                    'name': 'occupation',
                    'label': 'Occupation',
                    'placeholder': 'Select',
                    'options': 'occupation',
                    'required': true,
                },
                {
                    'component': 'upload',
                    'type': 'file',
                    'name': 'payslip',
                    'label': 'Payslip',
                    'accept': '.pdf, .jpeg, .jpg, .png',
                    'required': true,
                    'validation': {
                        'message': 'Upload the file'
                    },
                    'dependsOn': {
                        'target': 'annualIncome',
                        'type': 'hide',
                        'condition': {
                            'operator': '>',
                            'value': 50000
                        }
                    }
                },
            ],
            'buttons':
                [
                    {
                        'label': 'Back',
                        'target': 'tab',
                        'varient': 'secondary',
                        'options': 'tab',
                        'targettedFunction': 'prev',
                    },
                    {
                        'label': 'Next',
                        'target': 'tab',
                        'targettedFunction': 'next',
                        'varient': 'primary',
                        'options': 'tab',
                        'section_id': 'other_details',
                    },
                ]
        },
        {
            'dependsOn': {
                'target': 'tab',
                'values': [2]
            },
            'layout': 'grid grid-cols-3 gap-x-6 gap-y-4 py-6',
            'wrapper': true,
            'section_id': 'address_details',
            'fields': [
                {
                    'component': 'input',
                    'type': 'text',
                    'name': 'address_one',
                    'label': 'Address 1',
                    'placeholder': 'Enter the address 1',
                    'required': true,
                    'validation':{
                        'message':'Enter the address'
                    }
                },
                {
                    'component': 'input',
                    'type': 'text',
                    'name': 'address_tow',
                    'label': 'Address 2',
                    'placeholder': 'Enter the address 2 ( Optional )',
                },
                {
                    'component': 'input',
                    'type': 'number',
                    'name': 'zip_code',
                    'label': 'Zip Code',
                    'placeholder': 'Enter the zip code',
                    'required': true,
                    'validation':{
                        'message':'Enter the zip code'
                    }
                },
                {
                    'component': 'select',
                    'name': 'state',
                    'label': 'State',
                    'placeholder': 'Select State',
                    'options': 'states',
                    'required': true,
                    'reset': {
                        'target': 'district',
                    }
                },
                {
                    'component': 'select',
                    'name': 'district',
                    'label': 'District',
                    'placeholder': 'Select District',
                    'dependsOnOptions': 'state',
                    'required': true,
                    'dependsOn': {
                        'target': 'state',
                        'options': 'state',
                        'type': 'disable',
                        'values': ["tamilNadu", "karnataka", "maharashtra", "uttarPradesh"],
                    }
                },
            ],
            'buttons':
                [
                    {
                        'label': 'Back',
                        'target': 'tab',
                        'varient': 'secondary',
                        'options': 'tab',
                        'targettedFunction': 'prev',
                    },
                    {
                        'label': 'Next',
                        'target': 'tab',
                        'targettedFunction': 'next',
                        'varient': 'primary',
                        'options': 'tab',
                        'section_id': 'address_details',
                    },
                ]
        },
        {
            'dependsOn': {
                'target': 'tab',
                'values': [3]
            },
            'layout': 'grid grid-cols-1 gap-x-6 gap-y-4 py-6',
            'wrapper': true,
            'section_id': 'members_allocation',
            'fields': [
                {
                    'component': 'addLimitedInputs',
                    'type': 'number',
                    'name': 'membersPercentage',
                    'componentLabel': 'Members {id} Allocation',
                    'placeholder': 'Enter the annual income',
                    'required': true,
                    'max': 3,
                    'maxSum': 100,
                    'validation': {
                        'message': 'Please make sure sum of all 100',
                        'length': {
                            'min': 5,
                            'max': 20
                        }
                    }
                },
            ],
            'buttons':
                [
                    {
                        'label': 'Back',
                        'target': 'tab',
                        'varient': 'secondary',
                        'options': 'tab',
                        'targettedFunction': 'prev',
                    },
                    {
                        'label': 'Submit',
                        'target': 'form',
                        'targettedFunction': 'submit',
                        'varient': 'primary',
                        'section_id': 'members_allocation',
                    },
                ]
        }
    ],
}