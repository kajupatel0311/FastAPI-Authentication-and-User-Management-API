import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PageSkeleton() {

  return (

    <div className="space-y-6">

      <Skeleton height={45} width={280} />

      <Skeleton height={150} />

      <div className="grid gap-6 md:grid-cols-2">

        <Skeleton height={250} />

        <Skeleton height={250} />

      </div>

    </div>

  );

}

export default PageSkeleton;

