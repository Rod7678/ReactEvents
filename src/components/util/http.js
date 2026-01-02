import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

let url = 'http://localhost:3000/events';
export async function fetchEvents({ signal ,searchTerm}) {
    if(searchTerm){
        url += '?search='+searchTerm;
    }

    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
    }

    const { events } = await response.json();

    return events;
}

 
export async function fetchSelectableImage({ signal }) {
    const response = await fetch(url+'/images', { signal });

    if(!response.ok){
        const error = new Error("An error occurred while fetching images");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { images } = await response.json();

    return images;
}


export async function createNewEvent(eventData) {
    const responce = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(eventData),
    })
    
    if(!responce.ok){
        const error = new Error('An error occurred while sending the event');
        error.status = responce.status;
        error.info = await responce.json();
        throw error;
    }

    const { event } = await responce.json();

    return event
}


export async function fetchEvent({ id, signal }) {
    const response = await fetch(`${url}/${id}`, { signal });

    if(!response.ok){
        const error = new Error('An error occurred during fetching event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event;
    
}

export async function deleteEvent({ id }) {
    const response = await fetch(`${url}/${id}`,{
        method: 'DELETE',
    });

    if(!response.ok){
        const error = new Error('An error occured during deleting event');
        error.code = response.status;
        error.info = await response.json();
        throw error
    }

    return response.json()
}


export async function updateEvent({ id, event }) {
    const response = await fetch(`${url}/${id}`,{
        method: 'PUT',
        body: JSON.stringify({ event }),
        headers: {
            'Content-Type' : 'application/json'
        }

    })    

    if(!response.ok){
        const error =  new Error('An error occured during updating event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    };

    return response.json();
}