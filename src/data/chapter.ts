import { challenge } from "./challenge";

export interface chapter {
    chapterName: string;
    id: number;
    challengeList: challenge[];
}

const chapters: chapter[] = [
    {
        chapterName: 'test1',
        id: 0,
        challengeList: [
            {
                name: 'test11',
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
        ],
    },
    {
        chapterName: 'test2',
        id: 1,
        challengeList: [
            {
                name: 'test1',
                id: 0
            },
            {
                name: 'test3',
                id: 1
            },
            {
                name: 'test4',
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
        ],
    },
    {
        chapterName: 'test3',
        id: 2,
        challengeList: [
            {
                name: 'test1',
                id: 0
            },
            {
                name: 'test2',
                id: 1
            },
            {
                name: 'test8',
                id: 2

            },
            {
                name: 'test7',
                id: 3
            },
            {
                name: 'test5',
                id: 4
            },
        ],
    },
    {
        chapterName: 'test4',
        id: 3,
        challengeList: [
            {
                name: 'test1',
                id: 0
            },
            {
                name: 'test2',
                id: 1
            },
            {
                name: 'test9',
                id: 2

            },
            {
                name: 'test10',
                id: 3
            },
            {
                name: 'test5',
                id: 4
            },
        ],
    },
];

export const getChapters = () => chapters;

export const getChapter = (id: number) => chapters.find(c => c.id === id);

export const getChallengeList = (id: number) => chapters.find(c => c.id === id)?.challengeList;

export const getChallenge = (id: number, challengeId: number) => chapters.find(c => c.id === id)?.challengeList.find(c => c.id === challengeId);