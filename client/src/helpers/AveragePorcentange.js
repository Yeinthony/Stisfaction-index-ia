function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

export const averagePorcentage = (p1, p2) =>{
    p1 = parseFloat(p1);
    p2 = parseFloat(p2);
    let mergedPorcentage = ((p1 + p2) / (100 + 100)) * 100;
    //console.log(`${p1} + ${p2} = ${mergedPorcentage}`);
    return roundToTwo(mergedPorcentage)
}

export const averagePorcentageExpressions = (detections) =>{
    
    const mergedRecords = {
        angry: 0,
        disgust: 0,
        fear: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprise: 0,
    }

    let count = 0;

    detections.map(el=>{
        if (count === 0) {
            mergedRecords.angry =  parseFloat(el.angry);
            mergedRecords.disgust = parseFloat(el.disgust);
            mergedRecords.fear =  parseFloat(el.fear);
            mergedRecords.happy = parseFloat(el.happy);
            mergedRecords.neutral = parseFloat(el.neutral);
            mergedRecords.sad = parseFloat(el.sad);
            mergedRecords.surprise = parseFloat(el.surprise);
        }else{
            mergedRecords.angry = averagePorcentage(mergedRecords.angry, el.angry);
            mergedRecords.disgust = averagePorcentage(mergedRecords.disgust, el.disgust);
            mergedRecords.fear = averagePorcentage(mergedRecords.fear, el.fear);
            mergedRecords.happy = averagePorcentage(mergedRecords.happy, el.happy);
            mergedRecords.neutral = averagePorcentage(mergedRecords.neutral, el.neutral);
            mergedRecords.sad = averagePorcentage(mergedRecords.sad, el.sad);
            mergedRecords.surprise = averagePorcentage(mergedRecords.surprise, el.surprise);
        }
        count+=1;
    });

    return mergedRecords;
}

export const averagePorcentageGenders = (detections) =>{
    
    const mergedRecords = {
        male: 0,
        female: 0,
    }

    let count = 0;

    detections.map(el=>{
        if (count === 0) {
            mergedRecords.male =  parseFloat(el.male);
            mergedRecords.female = parseFloat(el.female);
        }else{
            mergedRecords.male = averagePorcentage(mergedRecords.male, el.male);
            mergedRecords.female = averagePorcentage(mergedRecords.female, el.female);
        }
        count+=1;
    });

    return mergedRecords;
}

export const averagePorcentageAges = (detections) =>{
    
    const mergedRecords = {
        six_to_eleven: 0,
        twelve_to_eighteen: 0,
        nineteen_to_twentysix: 0,
        twentyseveven_to_fiftynine: 0,
        sixty_to_eighty: 0,
    }

    let count = 0;

    detections.map(el=>{
        if (count === 0) {
            mergedRecords.six_to_eleven =  parseFloat(el.six_to_eleven);
            mergedRecords.twelve_to_eighteen = parseFloat(el.twelve_to_eighteen);
            mergedRecords.nineteen_to_twentysix =  parseFloat(el.nineteen_to_twentysix);
            mergedRecords.twentyseveven_to_fiftynine = parseFloat(el.twentyseveven_to_fiftynine);
            mergedRecords.sixty_to_eighty = parseFloat(el.sixty_to_eighty);
        }else{
            mergedRecords.six_to_eleven = averagePorcentage(
                mergedRecords.six_to_eleven, el.six_to_eleven
            );
            mergedRecords.twelve_to_eighteen = averagePorcentage(
                mergedRecords.twelve_to_eighteen, el.twelve_to_eighteen
            );
            mergedRecords.nineteen_to_twentysix = averagePorcentage(
                mergedRecords.nineteen_to_twentysix, el.nineteen_to_twentysix
            );
            mergedRecords.twentyseveven_to_fiftynine = averagePorcentage(
                mergedRecords.twentyseveven_to_fiftynine, el.twentyseveven_to_fiftynine
            );
            mergedRecords.sixty_to_eighty = averagePorcentage(
                mergedRecords.sixty_to_eighty, el.sixty_to_eighty
            );
        }
        count+=1;
    });

    return mergedRecords;
}