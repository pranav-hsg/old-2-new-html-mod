// IIFE
// import {SetupUI} from './utils/ui-setup'
(function () {
    let defaultAction = 'show';
    function getNthMapItem(mapObj, n) {
        // The key at index n
        var key = Array.from(mapObj.keys())[n]; // Returns key
        // The value of the item at index n
        var val = mapObj.get(key); // Returns val
        // // ... or ...
        // var val2 = mapObj.get(Array.from(mapObj.keys())[n]);
        return [key, val];
    }
    function determineAction(compareObj, value) {
        if (value == getNthMapItem(compareObj, 0)[1]) {
            setUpUI.changeTitles('Old 2 new List page', 'N/A');
            return analyzeResults;
        }
        else if (value == getNthMapItem(compareObj, 1)[1]) {
            setUpUI.changeTitles('Old 2 new Show page', 'N/A');
            return generateEntireShowPageHtml;
        }
        else {
            setUpUI.changeTitles('Old 2 new Edit page', 'N/A');
            return (a) => a + ' ' + value + '*';
        }
        return (a) => { return 'kd'; };
    }
    let selectionItems = new Map(Object.entries({
        'Old to new List Page': "list",
        'Old to new Show Page': "show",
        'Old to new Edit Page': "edit",
    }));
    const setUpUI = new SetupUI((selectedValue) => {
        // selection  button handler
        let handleFunction = determineAction(selectionItems, selectedValue);
        setUpUI.setConvertButtonHandler((input) => handleFunction(input));
        setUpUI.setLocalStorage('action-type', selectedValue);
        return selectedValue;
    }, (input) => {
        // convert button handler
        let cacheActionType = setUpUI.getLocalStorage('action-type');
        let output = input;
        if (cacheActionType) {
            let handleFunction = determineAction(selectionItems, cacheActionType);
            output = handleFunction(input);
        }
        else {
            output = determineAction(selectionItems, defaultAction)(input);
        }
        return output;
    });
    const hET = new HtmlTool();
    const sH = new StringHelper();
    const oHC = new ObjectHelperClass();
    const hF = new HtmlFormatter();
    window.addEventListener("load", () => {
        setUpUI.prepareSelectAction(selectionItems);
    });
})();
