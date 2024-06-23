export const retrieveSettings = async (address : string) : Promise<any> => {
    let r = await fetch("http://" + address + "/settings");
    let json = await r.json();
    
    return json;
}

export const updateSettings = async (address : string, settings : any) : Promise<void> => {
    
    const options = {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
    }

    console.debug(options);

    fetch("http://" + address + "/settings", options);
}

export const ping = async (address : string) : Promise<boolean> => {
    try{
        let r = await fetch("http://" + address);
        return r.status == 200
    } catch(e)
    {
        return false;
    }
}