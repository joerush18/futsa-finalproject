import { Collection, Database, functions } from "../config/admin";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { IBids, INotification, IRequest, NOTIFICATION_TYPE } from "../types";
import createUniqueId from "../utils/createUniqueId";

const listener = async (snapshot: QueryDocumentSnapshot) => {
  const bids = snapshot.data() as IBids;

  const createNotificationToUser = async (
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
        name: bids.createdBy?.name ?? "",
        id: bids.createdBy?.id ?? "",
      },
      createdFor: request.createdBy?.id ?? "",
      collectionId: reqeust.id ?? "",
    };
    try {
      await notificationRef.set(_notification);
    } catch (e) {
      throw new Error("Error while creating notification");
    }
    return Promise.resolve();
  };

  const reqRef = Database.collection(Collection.Requests).doc(bids.requestId);
  const reqSnap = await reqRef.get();
  const request = reqSnap.data() as IRequest;
  const message = `Your have a new bid for ${request.title}.`;
  await createNotificationToUser(request, message);
  return Promise.resolve();
};

const onUpdateBids = functions.firestore
  .document(`${Collection.Bids}/{id}`)
  .onCreate((snap) => listener(snap));

export default onUpdateBids;
