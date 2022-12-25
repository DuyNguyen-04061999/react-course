import { courseService } from "@/services/course.service";
import { useFetch } from "./useFetch";

export const useGetCourseDetails = (useParams) => {
  const { id } = useParams();

  const { data: course, loading } = useFetch(
    () => courseService.getCourseDetails(id),
    [id]
  );

  return { course, id, loading };
};
