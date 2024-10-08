import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const EditJobPage = ({ updateJobSubmit }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);
        setFormData({
          title: data.title,
          type: data.type,
          description: data.description,
          salary: data.salary,
          location: data.location,
          company: {
            name: data.company.name,
            description: data.company.description,
            contactEmail: data.company.contactEmail,
            contactPhone: data.company.contactPhone,
          },
        });
      } catch (error) {
        console.error("Error fetching job", error);
        toast.error("Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [objectKey, nestedKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [objectKey]: {
          ...prevState[objectKey],
          [nestedKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!formData) {
      toast.error("No data to submit");
      return;
    }
    const updatedJob = {
      id: job.id,
      ...formData,
    };
    updateJobSubmit(updatedJob);
    toast.success("Job updated successfully");
    navigate(`/jobs/${id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!formData) {
    return <div>Failed to load job data</div>;
  }

  return (
    <div>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">Update Job</h2>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Job Type
                </label>
                <select id="type" name="type" className="border rounded w-full py-2 px-3" required="">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Software Engineer"
                  required=""
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="Add any job duties, expectations, requirements, etc"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  required=""
                  value={formData.salary}
                  onChange={handleChange}>
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required=""
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <h3 className="text-2xl mb-5">Company Info</h3>
              <div className="mb-4">
                <label htmlFor="company.name" className="block text-gray-700 font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company.name"
                  name="company.name"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  value={formData.company.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company.description" className="block text-gray-700 font-bold mb-2">
                  Company Description
                </label>
                <textarea
                  id="company.description"
                  name="company.description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="What does your company do?"
                  value={formData.company.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company.contactEmail" className="block text-gray-700 font-bold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="company.contactEmail"
                  name="company.contactEmail"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required=""
                  value={formData.company.contactEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company.contactPhone" className="block text-gray-700 font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="company.contactPhone"
                  name="company.contactPhone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  value={formData.company.contactPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit">
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditJobPage;
