function allowDownloadSchedule() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        console.error('Downloading the calendar is not supported without persistent login')
    } else {
        if (document.location.href.indexOf('P_CrseSchdDetl') > -1 && document.location.href.indexOf('bwskfshd') == -1) {
            $('.pagebodydiv').first().append('<button class="downloadICS button">Download ICS File</button>')
            $('.button').attr('style', 'background-color: #990000; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px');
            $('.downloadICS').click(() => {
                let cal = `BEGIN:VCALENDAR\nPRODID:Calendar\nVERSION:2.0\n`;
                let counter = 0;

                //Thanks stackoverflow
                function pad(i) {
                    return i < 10 ? `0${i}` : `${i}`;
                }

                function formatDateTime(date) {
                    const year = date.getUTCFullYear();
                    const month = pad(date.getUTCMonth() + 1);
                    const day = pad(date.getUTCDate());
                    const hour = pad(date.getUTCHours());
                    const minute = pad(date.getUTCMinutes());
                    const second = pad(date.getUTCSeconds());
                    return `${year}${month}${day}T${hour}${minute}${second}Z`;
                }

                $('table:nth-child(4)').children('tbody').find('tr').each((i, item) => {
                    if (i == 0) return;

                    let info = {
                        crn: $(item).find('td:nth-child(1)').text(),
                        course: $(item).find('td:nth-child(2)').text(),
                        title: $(item).find('td:nth-child(3)').text(),
                        startDate: $(item).find('td:nth-child(7)').text(),
                        endDate: $(item).find('td:nth-child(8)').text(),
                        days: $(item).find('td:nth-child(9)').text(),
                        times: $(item).find('td:nth-child(10)').text(),
                        location: $(item).find('td:nth-child(11)').text(),
                        instructor: $(item).find('td:nth-child(12)').text()
                    }

                    if (info.crn.length >= 4) {
                        var days = info.days.split('');
                        for(let i=0; i<days.length; i++) {
                            let day;
                            switch (item) {
                                case 'T':
                                    day = "Tuesday";
                                    break;
                                case 'R':
                                    day = "Thursday";
                                    break;
                                case 'U':
                                    day = "Sunday";
                                    break;
                                case 'M':
                                    day = "Monday";
                                    break;
                                case 'W':
                                    day = "Wednesday";
                                    break;
                            }
                            cal += `
                                BEGIN:VEVENT
                                UID:${counter++}@default
                                Class:PUBLIC
                                DESCRIPTION:${info.title} with ${info.instructor}
                                DTSTAMP;VALUE=DATE-TIME:${formatDateTime(new Date())}
                                DTSTART:${formatDateTime(new Date(moment(new Date(info.startDate + " " + info.times.split(' - ')[0])).day(day).format()))}
                                DTEND:${formatDateTime(new Date(moment(new Date(info.startDate + " " + info.times.split(' - ')[1])).day(day).format()))}
                                RRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=${formatDateTime(new Date(moment(new Date(info.endDate + " " + info.times.split(' - ')[1])).day(day).format()))}
                                LOCATION:${info.location}
                                SUMMARY;LANGUAGE=en-us:${info.course.substring(0, info.course.length - 3)}
                                TRANSP:TRANSPARENT
                                END:VEVENT
                            `;
                            
                        }
                    }
                })
                cal = cal + `END:VCALENDAR`;
                cal = cal.split('\n').filter(i => i != '').map(i => i.trim()).join('\n');
                let blob = new Blob([cal], {
                    type: 'text/calendar'
                })
                FileSaver.saveAs(blob, 'calendar.ics');
            })
        }
    }
}