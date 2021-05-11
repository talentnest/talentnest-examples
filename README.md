# talentnest-examples

## Making Use of TalentNest Job Postings Feed

TalentNest can automatically advertise your job postings on the client-specific TalentNest-built careers page, or job aggregator sites like Indeed, ZipRecruiter, Google Jobs, Facebook, and others. 

In addition -- you can obtain job postings from TalentNest as raw data  and use this data to display the job postings directly on your company's website, for example.

### Feed URL

The raw data of your latest job postings is being served at the following URL: https://your-client-name.talentnest.com/en/feed/latest

### Feed Content
The data is served in JSON format (https://www.json.org) and it looks like this:

```json
{"jobs": [
  {
    "title": "Sales Manager",
    "description": "<p>As part of the store leadership team, we want you:</p> ... etc.",
    "starts_on": "2021-05-06 00:00:00 EDT",
    "ends_on": "2021-06-06 00:00:00 EDT",
    "apply_url": "https://demo.talentnest.com/posting/56066/apply/56066",
    "posting_url": "https://demo.talentnest.com/posting/56066/location/56066",
    "business_unit": { "name": "Canada Sales", "country": "Canada", "state": "Ontario", "city": "Toronto" }
  },
  {
    "title": "Delivery Driver",
    "description": "<p>As part of the store delivery team, we want you:</p> ... etc.",
    "starts_on": "2021-05-06 00:00:00 EDT",
    "ends_on": "2021-06-06 00:00:00 EDT",
    "apply_url": "https://demo.talentnest.com/posting/56067/apply/56067",
    "posting_url": "https://demo.talentnest.com/posting/56067/location/56067",
    "business_unit": { "name": "Bridgewater HQ", "country": "Canada", "state": "Nova Scotia", "city": "Bridgewater" }
  }
  ...
]}
```

Up to 5 latest jobs are given by default. To get more jobs, for example up to 1000: https://your-client-name.talentnest.com/en/feed/latest/1000

Once you programmatically fetch the raw data from TalentNest URL, you can style the data and position it on your page as you wish.

### Sample Code

See it in action here https://talentnest.github.io/talentnest-examples/

```html
<!-- index.html -->
<html>
    ...
    <body>
        <div>
            <h1>TalentNest Examples</h1>
            <div class="feed-example-container">
                <h3>Making use of job postings feed</h3>
                <div class="feed">
                  <!-- This is where job postings will be displayed -->
                </div>
            </div>
        </div>
        ...
        <script src="js/feed-example.js"></script>
    </body>
</html>
```

```javascript
// feed-example.js

$(document).ready(function()
{
  let feed_container = document.querySelector('.feed');

  // Helper function to format date
  function format_date(date_string)
  {
    let formatted_date = date_string.split(/[ ,]+/);
    return formatted_date[0];
  }

  // Helper function to construct a job posting box for the feed container
  function append(title, content)
  {
    let job = document.createElement('div');
    job.className = 'job-container';

    $('<div />', { class: 'job-heading', html: title }).appendTo(job);
    $('<div />', { class: 'job-body', html: content }).appendTo(job);

    feed_container.append(job);
  }

  (async() => {
  
    // Function to retrieve JSON data from a server
    async function get_raw_data(url) {
      const tn_response = await fetch(url, { headers: { Accept: 'application/json' } });
      return await tn_response.json();
    }

    // Fetch job postings data from TalentNest
    const client_name = 'your-client-name';
    const url = `https://${client_name}.talentnest.com/en/feed/latest`;
    const json_raw_data = await get_raw_data(url);
    
    // Construct a box element for each job and show it on the page
    $.each(json_raw_data['jobs'], function(i, posting)
    {
      let opens_on = format_date(posting.starts_on);
      let closed_on = format_date(posting.ends_on);

      append(posting.title, posting.business_unit.city + ', ' + posting.business_unit.state + '<br />' +
        'Opens on: ' + opens_on + '<br />' + 'Ends on: ' + closed_on + '<br />' +
        '<div class="btn btn-default"><a href="' + posting.posting_url + '">' + 'View posting' + '</a></div>'
      );
    });
  })();
});
```
