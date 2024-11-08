import { fakerEN_US as faker } from '@faker-js/faker'

document.addEventListener('DOMContentLoaded', function () {
  const generateBtn = document.getElementById('generate-btn')
  const downloadCsvBtn = document.getElementById('download-csv')
  const downloadJsonBtn = document.getElementById('download-json')
  const output = document.getElementById('output')
  const data = []
  generateBtn.addEventListener('click', () => {
    data.length = 0
    const recordCount = document.getElementById('record-count').value
    const checkedFields = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((cb) => cb.id)
    output.textContent = ''
    for (let i = 0; i < recordCount; i++) {
      const record = {}
      for (const field of checkedFields) {
        switch (field) {
          case 'firstname':
            record.firstName = faker.person.firstName()
            break
          case 'middlename':
            record.middleName = faker.person.middleName()
            break
          case 'lastname':
            record.lastName = faker.person.lastName()
            break
          case 'birthdate':
            record.birthDate = faker.date
              .birthdate()
              .toISOString()
              .split('T')[0]
              .replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')
            break
          case 'address':
            record.address = faker.location.streetAddress({ useFullAddress: true })
            break
          case 'city':
            record.city = faker.location.city()
            break
          case 'state':
            record.state = faker.location.state({ abbreviated: true })
            break
          case 'zipcode':
            record.zipCode = faker.location.zipCode('#####')
            break
          case 'country':
            record.country = 'United States'
            break
          case 'ssn':
            record.ssn = '' + faker.number.int({ min: 100000000, max: 999999999 }) || faker.finance.accountNumber(9)
            break
          case 'email':
            record.email = faker.internet.email()
            break
          case 'sex':
            record.sex = faker.person.gender()
            break
          case 'password':
            record.password = faker.internet.password()
            break
          case 'phone':
            record.phone = faker.phone.number({ style: 'national' })
            break
        }
      }
      data.push(record)
      if (i === 1) {
        output.textContent = 'Generating data...'
      }
    }
    // output.textContent = JSON.stringify(data, null, 2)
    output.textContent = 'Data generated successfully'
  })

  downloadCsvBtn.addEventListener('click', () => {
    const headers = Object.keys(data[0])
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      data
        .map((row) => {
          return Object.values(row).join(',')
        })
        .join('\n')

    fileDownload(csvContent, 'data.csv')
  })

  downloadJsonBtn.addEventListener('click', () => {
    const jsonContent = 'data:application/json;charset=utf-8,' + JSON.stringify(data, null, 2)
    fileDownload(jsonContent, 'data.json')
  })

  function fileDownload(content, filename) {
    output.textContent = ''
    const encodedUri = encodeURI(content)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
})
