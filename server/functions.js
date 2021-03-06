function isHoliday(date) {
    var holidays = ['2022-1-1', 
      '2021-01-01',
      '2022-01-18',
      '2021-01-18',
      '2022-02-15',
      '2021-02-15',
      '2022-05-31',
      '2021-05-31',
      '2022-06-19',
      '2021-06-19',
      '2022-07-04',
      '2021-07-04',
      '2022-09-06',
      '2022-10-11',
      '2022-11-11',
      '2022-11-25',
      '2022-12-24',
      '2021-11-25',
      '2021-12-24',
      '2022-12-25',
      '2021-12-24',
      '2021-12-25']
      return holidays.includes(date)
    }

    module.exports = { isHoliday };