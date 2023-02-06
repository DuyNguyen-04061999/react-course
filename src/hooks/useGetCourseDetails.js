import { courseService } from "@/services/course.service";
import { useQuery } from "./useQuery";

export const useGetCourseDetails = (useParams) => {
  const { id } = useParams();
  const { data: { data: course = [] } = {}, loading } = useQuery({
    queryFn: () => courseService.getCourseDetails(id),
    queryKey: `course-${id}`,
    storeDriver: "sessionStorage",
  });

  return { course, id, loading };
};
