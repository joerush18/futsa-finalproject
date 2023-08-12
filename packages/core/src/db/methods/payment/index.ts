export const initiatePayment = async () => {
  const res = await fetch(
    `https://us-central1-futsa-e5f8a.cloudfunctions.net/initiatePayment`,
    {
      method: "POST",
    }
  );
  const data = await res.json();
  return data;
};

// const dbCreateTeamInvitation = async (
//   details: TeamInvitationArgs
// ): Promise<ITeamInvitation | undefined> => {
//   const { data } = await httpsCallable<
//     TeamInvitationArgs,
//     TeamInvitationResponse
//   >(
//     firebaseFunctions,
//     "createTeamInvitation"
//   )(details);

//   if (!data.success) {
//     throw new Error(data.message);
//   }

//   return data.data;
// };
