interface AvatarInterface {
    avatar_url: string;
    login: string;
    url: string;
}

async function getUsers(): Promise<void>{
    const myPromise = await fetch('https://api.github.com/users');
    const data = await myPromise.json();
    console.log(data);
}
document.querySelector('.btn_one').addEventListener('click', getUsers)
getUsers();

const getData = async (): Promise<void> => {
    const result = await fetch('https://api.github.com/users/ProstoVika')
    try {
        const items = await result.json();
        console.log(items);
    } catch (err) {
        console.log(`Something went wrong ${err}`)
    }
}
document.querySelector('.btn_two').addEventListener('click', getData)
getData();


async function showAvatar(): Promise<AvatarInterface> {
    const githubResponse = await fetch('https://api.github.com/users/ProstoVika');
    const myGithub = await githubResponse.json();
    const img = document.createElement('img');
    img.src = myGithub.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    try {
        const response = await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        img.remove();
        return myGithub;
    } catch (err) {
        console.error("Something went wrong");
    }
}

showAvatar();




