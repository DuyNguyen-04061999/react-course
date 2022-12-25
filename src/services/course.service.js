import { api, COURSE_API } from "@/config/api";

export const courseService = {
  getCourses: (limit = null) =>
    api?.get(`${COURSE_API}`, {
      params: {
        limit,
      },
    }),
  getCourseDetails: (id) => api?.get(`${COURSE_API}/${id}`),
  getCourseRelated: (id) => api?.get(`${COURSE_API}/related/${id}`),
  registerCourse: (data, id) => api?.post(`${COURSE_API}/register/${id}`, data),
  getMyCourse: () => api?.get(`${COURSE_API}/my-course`),
};
