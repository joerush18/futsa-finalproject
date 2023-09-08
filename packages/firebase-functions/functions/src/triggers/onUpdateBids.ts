import { Change } from "firebase-functions/v1";
import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { IBids, INotification, IRequest, NOTIFICATION_TYPE } from "../types";
import createUniqueId from "../utils/createUniqueId";

const listener = async (snapshot: Change<QueryDocumentSnapshot>) => {
  const before = snapshot.before.data() as IBids;
  const after = snapshot.after.data() as IBids;
  if (!after) {
    return;
  }

  const createNotificationToFutsal = async (
    reqeust: IRequest,
    message: string
  ) => {
    const id = createUniqueId();
    const notificationRef = Database.collection(Collection.Notification).doc(
      id
    );
    const _notification: INotification = {
      id: id,
      description: message,
      viewed: false,
      type: NOTIFICATION_TYPE.REQUESTS,
      createdAt: +new Date(),
      createdBy: {
        name: reqeust.createdBy?.name ?? "",
        id: reqeust.createdBy?.id ?? "",
      },
      createdFor: after.createdBy?.id ?? "",
      collectionId: reqeust.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
    return Promise.resolve();
  };

  if (after.isSelected && !before.isSelected) {
    const reqRef = Database.collection(Collection.Requests).doc(
      after.requestId
    );
    const reqSnap = await reqRef.get();
    const request = reqSnap.data() as IRequest;
    const message = `Your bid for request ( ${request.title} ) has been selected`;
    await createNotificationToFutsal(request, message);
  }

  return Promise.resolve();
};

const onUpdateBids = functions.firestore
  .document(`${Collection.Bids}/{id}`)
  .onUpdate((snap) => listener(snap));

export default onUpdateBids;
