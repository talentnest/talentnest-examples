$(document).ready(function()
{
  let feed_container = document.querySelector('.feed');

  function format_date(date_string)
  {
    let formatted_date = date_string.split(/[ ,]+/);
    return formatted_date[0];
  }

  function append(title, content)
  {
    let job = document.createElement('div');
    job.className = 'job-container';

    $('<div />', { class: 'job-heading', html: title }).appendTo(job);
    $('<div />', { class: 'job-body', html: content }).appendTo(job);

    feed_container.append(job);
  }

  (async() => {
    async function get_raw_data(url) {
      const tn_response = await fetch(url, { headers: { Accept: 'application/json' } });
      return await tn_response.json();
    }

    // Sample static JSON data
    const json_feed_url = 'https://raw.githubusercontent.com/talentnest/talentnest-examples/c41cdeb307249fc63675008efe704db725a04212/data/sample-job-feed.json';

    // -------------------------------------------------------------------------------
    // To get your feed, replace your-client-name
    // const json_feed_url = `https://your-client-name.talentnest.com/en/feed/latest`;
    // -------------------------------------------------------------------------------

    const json_raw_data = await get_raw_data(json_feed_url);

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
