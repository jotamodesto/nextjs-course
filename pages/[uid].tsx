import { GetServerSideProps } from "next";

export interface UserIdProps {
  id: string;
}

function UserIdPage(props: UserIdProps) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export const getServerSideProps: GetServerSideProps<UserIdProps> = async context => {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
};
