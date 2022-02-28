export interface challenge {
    id: number;
    name: string;
}

const challengeList: challenge[] = [
    {
        name: 'test1',
        id: 0
    },
    {
        name: 'test2',
        id: 1
    },
    {
        name: 'test3',
        id: 2

    },
    {
        name: 'test4',
        id: 3
    },
    {
        name: 'test5',
        id: 4
    },
];

export const getChallengeList = () => challengeList;

export const getChallenge = (id: number) => challengeList.find(c => c.id === id);