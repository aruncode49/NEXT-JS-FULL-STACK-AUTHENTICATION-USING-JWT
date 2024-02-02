const SingleProfilePage = ({ params }) => {
  const { id } = params;
  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center">
      <h1>Single Profile Page</h1>
      <p>This is a single user profile page</p>
      <p>The id of the user is : {id} </p>
    </div>
  );
};

export default SingleProfilePage;
