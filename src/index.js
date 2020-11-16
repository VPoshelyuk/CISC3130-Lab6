document.addEventListener('DOMContentLoaded', () => {
    //grab all the necessary elements by their id's
    const personalInfoSection = document.getElementById('personal_info');
    const septemberSection = document.getElementById('september');
    const octoberSection = document.getElementById('october');
    const novemberSection = document.getElementById('november');
    const decemberSection = document.getElementById('december');
    const finalSection = document.getElementById('final_info');
    const next = document.getElementById('next');
    const startOver = document.getElementById('startOver');

    //array of sections for easier access
    const allSections = [
        personalInfoSection,
        septemberSection,
        octoberSection,
        novemberSection,
        decemberSection
    ];

    //create variables that are going to be
    //populated with the user inputs
    let name = '';
    let sectionInfo = '';
    let labs = [];
    let practiceProblems = [];
    let exams = [];

    const handleNextClick = (e) => {
        //iterate over sections of the form
        allSections.forEach(section => {
            if(section.style.display !== "none"){ //find the section that was just displayed
                if (section.id === 'december') {
                    //if it's the last section of the form, make all the calculations and append results to the final page
                    const finalSec = sectionInfo !== "" ? `(Section: ${sectionInfo})` : "";//if section info was entered, use it
                    const finalName = name !== "" ? name : "Anonymous";//check to see if user chose to be anonymous if decided to name themselves

                    const labsScores = labs.length >= 5 ? //use only up to 5 first lab scores(number of labs we had so far)
                        labs.slice(0,5).reduce((a,b) => a + b)
                        :
                        labs.length !== 0 ?
                            labs.reduce((a,b) => a + b) : 0;
                    const labsAvg = (labsScores/5).toFixed(2)//find labs average
                    const labsMissed = labs.length < 5 ? //find number of labs missed
                        `<p>-> You missed ${5 - labs.length} labs<p>`
                        :
                        "<p>-> No labs missed! Great job!<p>";
                    const labsStats= labsAvg >= 1.4 ? 
                        `<p>-> You are on a good track with labs!<p>`
                        :
                        "";

                    const practiceProblemsScores = practiceProblems.length >= 6 ? //use only up to 6 first lab scores(number of practice problems we had so far)
                        practiceProblems.slice(0,6).reduce((a,b) => a + b)
                        :
                        practiceProblems.length !== 0 ? 
                            practiceProblems.reduce((a,b) => a + b) : 0;
                    const practiceProblemsAvg = (practiceProblemsScores/6).toFixed(2);//find practice problems average
                    const ppsStats= labsAvg >= 1.4 ? 
                        `<p>-> You are on a good track with practice problems!<p>`
                        :
                        "";

                    const examsScores = exams.length >= 2 ? //use only up to 2 first exams scores(number of exams we had so far)
                    exams.slice(0,2).reduce((a,b) => a + b)
                    :
                    exams.length !== 0 ?
                        exams.reduce((a,b) => a + b) : 0;
                    const examsAvg = (examsScores/2).toFixed(2);//find exams average
                    const examsStats= examsAvg >= 7 ? 
                        `<p>-> You are on a good track with exams!<p>`
                        :
                        "";

                    const scoresSum = labsScores + practiceProblemsScores + examsScores;//scores sum
                    const maxScores = 61;
                    const prediction = scoresSum > 55 ? 
                        "<p>I bet you'll pass this class with a pretty good score!</p>"
                        :
                        scoresSum < 26 ? 
                            "<p>Looks like there is no way for you to pass this class. Sorry!</p>"
                            :
                            `<p>You just need ${65 - scoresSum} to pass this class!</p>`

                    finalSection.innerHTML = //append everything to the last page
                    "<p>Final Results</p></br>" +
                    `<p>Hi, ${finalName + finalSec}</p>` +
                    "<h1>Labs Stats:<h1>" + 
                    `<p>-> There's been only 5 labs so far and your average score is: ` + 
                    `${labsAvg} (Maximum possible is: 1.80 w/o EC)</p>` +
                    labsMissed + labsStats +
                    "<h1>Practice Problems Stats:<h1>" +
                    `<p>-> 6 practice problems sets were assigned so far and your average ` +
                    `score is: ${practiceProblemsAvg} (Maximum possible is: 5.33 w/o EC)</p>` +
                    ppsStats +
                    "<h1>Exams Stats:<h1>" + 
                    `<p>-> Your midterms average is: ${examsAvg} (Maximum possible is: 10 w/o EC)</p>` +
                    examsStats +
                    "<h1>Notes:<h1>" +
                    `<p>-> Your current score for the class is ${scoresSum} out of ${maxScores}</p>` +
                    prediction;
                } else {
                    section.childNodes.forEach(node => {//go through all the nodes of the section
                        if(node.nodeName === 'INPUT'){//choose only input fields
                            if (node.id.includes('lab') && node.value) {//if it's a score for lab, append to lab array
                                labs.push(parseFloat(node.value));
                            } else if (node.id.includes('pp') && node.value) {//if it's a score for practice problems, append to practice problems array
                                practiceProblems.push(parseFloat(node.value));
                            } else if (node.id.includes('exam') && node.value) {//if it's a score for exam, append to exam array
                                exams.push(parseFloat(node.value))
                            } else if (node.id.includes('name')) {//if it's a name, save it
                                name += name === '' ? node.value : ` ${node.value}`
                            } else if (node.id === 'section') {//save section input
                                sectionInfo = node.value;
                            }
                        }
                    })
                }
            }
        })
    }

    //clear everything on "Start Over" button click
    const handleStartOverClick = (e) => {
        labs = [];
        practiceProblems = [];
        exams = [];
        name = '';
        sectionInfo = '';
    }

    //add listeners to the only 2 buttons of this app
    next.addEventListener("click", handleNextClick);
    startOver.addEventListener("click", handleStartOverClick);
})
