import { Change } from "firebase-functions/v1";
import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { IEvents, INotification, ITeam, NOTIFICATION_TYPE } from "../types";
import createUniqueId from "../utils/createUniqueId";

const listener = async (snapshot: Change<QueryDocumentSnapshot>) => {
  const before = snapshot.before.data() as IEvents;
  const after: IEvents = snapshot.after.data() as IEvents;
  if (!after) {
    return;
  }

  const createNotificationToUser = async (team: ITeam, message: string) => {
    const id = createUniqueId();
    const notificationRef = Database.collection(Collection.Notification).doc(
      id
    );
    const _notification: INotification = {
      id: id,
      description: message,
      viewed: false,
      type: NOTIFICATION_TYPE.EVENT,
      createdAt: +new Date(),
      createdBy: {
        name: after.createdBy?.name ?? "",
        id: after.createdBy?.id ?? "",
      },
      createdFor: team.ownerId,
      collectionId: after.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
    return Promise.resolve();
  };

  const createNotificationToFutsal = async (team: ITeam, message: string) => {
    const id = createUniqueId();
    const notificationRef = Database.collection(Collection.Notification).doc(
      id
    );
    const _notification: INotification = {
      id: id,
      description: message,
      viewed: false,
      type: NOTIFICATION_TYPE.EVENT,
      createdAt: +new Date(),
      createdBy: {
        name: team.name,
        id: team.ownerId,
      },
      createdFor: after.createdBy?.id ?? "",
      collectionId: after.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
    return Promise.resolve();
  };

  after.teams.forEach(async (team, index) => {
    // Send notification to the team owner if the team is verified
    if (before.teams[index].verified === false && team.verified) {
      createNotificationToUser(
        team,
        `Your team has been approved for the event ${after.name}`
      );
    }

    // Send notification to the team owner if the team is removed.
    if (before.teams[index].verified && !team.verified) {
      createNotificationToUser(
        team,
        `Your team has been removed for the event ${after.name}. You can leave.`
      );
    }

    // Send notification to the futsal if the team is added
    if (after.teams[index].id !== before.teams[index].id) {
      createNotificationToFutsal(
        team,
        `${team.name} has been registered to event ${after.name}`
      );
    }
  });

  return Promise.resolve();
};

const onUpdateEvents = functions.firestore
  .document(`${Collection.Events}/{id}`)
  .onUpdate((snap) => listener(snap));

export default onUpdateEvents;
