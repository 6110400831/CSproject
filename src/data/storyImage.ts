export interface story{
    name: string;
    image: string;
    id?: Number;
}

const listOfstory: story[] = [
    {
        name: 'Acat',
        image: "/assets/images/Story picture.png",
        id: 1,
    },
    {
        name: 'Acat',
        image: "/assets/images/Story picture.png",
        id: 2,
    },
    {
        name: 'Acatqwfq',
        image: "/assets/images/Story picture.png",
        id: 3,
    },
    {
        name: 'Acatdonut',
        image: "/assets/images/Story picture.png",
        id: 4,
    },
    {
        name: 'Acatppppppe',
        image: "/assets/images/Story picture.png",
        id: 5,
    },
    {
        name: 'Acatxfghjop',
        image: "/assets/images/Story picture.png",
        id: 6,
    },
]

export const thisStories = () => listOfstory;

export const getStory = (index: number) => listOfstory.at(index);
