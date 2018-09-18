function emojiGrades() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.log('Emoji Grades not supported without Persistent Login');
	} else {
		if (document.location.href.indexOf('P_ViewGrde') > -1) {
			$('tbody td:nth-child(7)').each((i, item) => {
				const grade = $(item).text();
				let emoji = '';
				switch (grade) {
				case 'A':
					emoji = 'fire';
					break;
				case 'A-':
					emoji = '--1';
					break;
				case 'B+':
					emoji = 'blush';
					break;
				case 'B':
					emoji = 'smiley';
					break;
				case 'B-':
					emoji = 'disapointed';
					break;
				case 'C+':
					emoji = 'slightly_smiling_face';
					break;
				case 'C':
					emoji = 'upside_down_face';
					break;
				case 'C-':
					emoji = 'joy';
					break;
				case 'D':
					emoji = 'skull';
					break;
				case 'F':
					emoji = '100';
					break;
				case 'XF':
					emoji = 'hankey';
					break;
				default:
					emoji = 'question';
					break;
				}

				$(item).append(`<i style="float: right;" class="em em-${emoji}"></i>`);
			});

			$('tr td:nth-child(6) .rightaligntext').each((i, item) => {
				const gpa = parseFloat($(item).text());
				if (gpa == 4.0) {
					emoji = 'fire';
				} else if (gpa >= 3.5 && gpa <= 3.99) {
					emoji = 'sunglasses';
				} else if (gpa >= 3.0 && gpa <= 3.49) {
					emoji = 'smile';
				} else if (gpa >= 2.5 && gpa <= 2.99) {
					emoji = 'expressionless';
				} else if (gpa >= 2.0 && gpa <= 2.49) {
					emoji = 'upside_down_face';
				} else if (gpa >= 1.5 && gpa <= 1.99) {
					emoji = 'joy';
				} else if (gpa >= 1.0) {
					emoji = 'skull';
				} else {
					emoji = '100';
				}

				$(item).append(`<i style="float: right;" class="em em-${emoji}"></i>`);
			});
		}
	}
}