
const dateFormat = function (date) {
    const dte = new Date(date);
    return `${dte.getDate()}, ${dte.getMonth() + 1}, ${dte.getFullYear()}`
}
checkDate = function (aa, bb) {
    return dateFormat(aa) === dateFormat(bb);
}
const getJson = function (url, err = "something went wrong") {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((data) => {
                if (data.status === 403) {
                    reject(`${err},you're loading too fast (${data.status})`);
                }
                if (data.status === 404) {
                    reject(`${err}, not found(fuck you)`);
                }
                resolve(data.json());
            });
    })
}


const getCurrentPosition = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}
//////////////////////////////////
const getAzan = async function () {
    try {

        const loc = await getCurrentPosition();
        // console.log(loc);
        const { latitude: lat, longitude: lng } = loc.coords;
        // console.log(lat, lng);
        const date = new Date();
        const curDate = `${date.getFullYear()}/${date.getMonth() + 1}`;
        const response = await getJson(`http://api.aladhan.com/v1/calendar/${curDate}?latitude=${lat}&longitude=${lng}&method=5`);
        // console.log(response);
        let [{ timings }] = await response.data.filter(ele => {
            if (checkDate(ele.date.readable, new Date()))
                return ele;
        });
        if (!timings)
            throw ("not valid link");
        return timings;
    } catch (err) {
        console.err(err);
    }



    try {

    } catch (err) {
        return console.log(err);
    }

}
