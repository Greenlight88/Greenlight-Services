/**
 * Known Valid Australian Addresses
 * Used for test scenarios that require address validation
 */

module.exports = [
    {
        street: '123 Collins St',
        city: 'Melbourne',
        state: 'VIC',
        zip: '3000',
        formatted: '123 Collins St, Melbourne VIC 3000'
    },
    {
        street: '1 Martin Place',
        city: 'Sydney',
        state: 'NSW',
        zip: '2000',
        formatted: '1 Martin Place, Sydney NSW 2000'
    },
    {
        street: '100 Eagle St',
        city: 'Brisbane',
        state: 'QLD',
        zip: '4000',
        formatted: '100 Eagle St, Brisbane QLD 4000'
    },
    {
        street: '91 King William St',
        city: 'Adelaide',
        state: 'SA',
        zip: '5000',
        formatted: '91 King William St, Adelaide SA 5000'
    },
    {
        street: '140 St Georges Terrace',
        city: 'Perth',
        state: 'WA',
        zip: '6000',
        formatted: '140 St Georges Terrace, Perth WA 6000'
    }
];
