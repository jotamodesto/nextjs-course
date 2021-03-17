import { GetServerSideProps } from "next";

export interface UserProfileProps {
  username: string;
}

function UserProfilePage(props: UserProfileProps) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps<UserProfileProps> = async context => {
  const { params, req, res } = context;

  return {
    props: {
      username: "John",
    },
  };
};
