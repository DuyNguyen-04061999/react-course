import { courseService } from "@/services/course.service";
import { useFetch } from "./useFetch";
import { useQuery } from "./useQuery";

export const useGetCourseDetails = (useParams) => {
  const { id } = useParams();

  // const { data: course, loading } = useFetch(
  //   () => courseService.getCourseDetails(id),
  //   [id]
  // );
  const { data: { data: course = [] } = {}, loading } = useQuery({
    queryFn: () => courseService.getCourseDetails(id),
    queryKey: `course-${id}`,
    storeDriver: "sessionStorage",
    // dependencyList: [id],
  });

  return { course, id, loading };
};
