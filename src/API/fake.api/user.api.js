import { professionsObject as professions } from "./professions.api";
import { qualities } from "./qualities.api";

const users = [
  {
    _id: "67rdca3eeb7f6fgeed471815",
    name: "Джон Дориан",
    email: "johndorian@fastcompany.ru",
    sex: "male",
    profession: professions.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471816",
    name: "Кокс",
    email: "koks@fastcompany.ru",
    sex: "male",
    profession: professions.doctor,
    qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471817",
    name: "Боб Келсо",
    email: "bobkelso@fastcompany.ru",
    sex: "male",
    profession: professions.doctor,
    qualities: [qualities.buller],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471818",
    name: "Рэйчел Грин",
    email: "rachelgreene@fastcompany.ru",
    sex: "female",
    profession: professions.waiter,
    qualities: [qualities.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471819",
    name: "Шелдон Купер",
    email: "sheldoncooper@fastcompany.ru",
    sex: "male",
    profession: professions.physics,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471820",
    name: "Леонард Хофстедтер",
    email: "leonardhofstedter@fastcompany.ru",
    sex: "male",
    profession: professions.physics,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471821",
    name: "Говард Воловиц",
    email: "howardwolowitz@fastcompany.ru",
    sex: "male",
    profession: professions.engineer,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471822",
    name: "Никола Тесла",
    email: "nikolatesla@fastcompany.ru",
    sex: "male",
    profession: professions.engineer,
    qualities: [qualities.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471823",
    name: "Моника Геллер",
    email: "monicageller@fastcompany.ru",
    sex: "female",
    profession: professions.cook,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed471824",
    name: "Рататуй",
    email: "ratatouille@fastcompany.ru",
    sex: "male",
    profession: professions.cook,
    qualities: [qualities.handsome, qualities.buller],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed47181f",
    name: "Джоуи Триббиани",
    email: "joeytribbiani@fastcompany.ru",
    sex: "male",
    profession: professions.actor,
    qualities: [qualities.uncertain, qualities.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: "67rdca3eeb7f6fgeed47181r",
    name: "Брэд Питт",
    email: "bradpitt@fastcompany.ru",
    sex: "male",
    profession: professions.actor,
    qualities: [qualities.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false
  }
];

if (!localStorage.users) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(JSON.parse(localStorage.getItem("users"))), 200)
  );

const update = (data) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users"));
      const editUserIndex = users.findIndex((user) => user._id === data._id);
      users[editUserIndex] = { ...users[editUserIndex], ...data };
      localStorage.setItem("users", JSON.stringify(users));
      resolve(users[editUserIndex]);
    }, 200)
  );

const getUserById = (id) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users"));
      return resolve(users.find((user) => user._id === id));
    }, 200)
  );
};

export default { fetchAll, getUserById, update };
