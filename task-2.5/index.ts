function getMyCookies(): string[]{
    const decodedCookie = decodeURIComponent(document.cookie);
    const allCookies = decodedCookie.split(';');
    return allCookies.filter(cookie => {
        const id = cookie.split('=')[0];
        return /LoveCookies/.test(id);
    }) || [];
}

function getList(): void {
    const myCookies = getMyCookies();
    const list = document.getElementById('list');
    if (myCookies.length) {
        JSON.parse(myCookies[0].split('=')[1]).forEach(value => {
            list.innerHTML+='<div id='+value+'>'+value+' <button onclick="deleteItem(\''+value+'\')"><i class="fas fa-trash"></i></button></div>';
        });
    }
}

function addItem(): void{
    let text=(document.getElementById('grocery') as HTMLInputElement).value;
    if(text.length>0){
        const date = new Date();
        const id = 'LoveCookies';
        addListItem(id, text);
        (document.getElementById('grocery')as HTMLInputElement).value='';
    }
}

function addListItem(id: string, text: string): void {
    setCookie(id, text, 365);
    const list = document.getElementById('list');
    list.innerHTML+='<div id='+text+'>'+text+' <button onclick="deleteItem(\''+text+'\')" class="delete-btn"><i class="fas fa-trash"></i></button></div>';
}

function setCookie(id: string, value: string, days: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    const myCookies = getMyCookies();
    let values = [];
    if (myCookies.length) {
        values = [...JSON.parse(myCookies[0].split('=')[1]), value]
    } else {
        values = [value];
    }
    document.cookie = id + "=" + JSON.stringify(values) + ";" + expires + ";path=/";
}

function deleteItem(id: string): void {
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    const myCookies = getMyCookies();
    const values = JSON.parse(myCookies[0].split('=')[1]).filter(item => item !==id);
    const item = document.getElementById(id);
    item.remove();
    document.cookie = 'LoveCookies' + "=" + JSON.stringify(values) + ";" + expires + ";path=/";
}


function deleteList(): void {
    const myCookies = getMyCookies();
    const values = JSON.parse(myCookies[0].split('=')[1]);
    values.forEach(value => {
        const item = document.getElementById(value);
        item.remove()
    })
    document.cookie = 'LoveCookies' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

/*if(!myCookies) return;*/
