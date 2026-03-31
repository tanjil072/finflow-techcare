import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { useCounterStore } from "./store/counterStore";

const data = [
  {
    name: "Page A",
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: "Page C",
    uv: 320,
    pv: 1398,
    amt: 2400,
  },
  {
    name: "Page D",
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: "Page E",
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: "Page F",
    uv: 189,
    pv: 4800,
    amt: 2400,
  },
];

type FormValues = {
  name: string;
  email: string;
};

function App() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  // React Query test - fetching posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  const [submittedForm, setSubmittedForm] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (formData: FormValues) => {
    setSubmittedForm(formData);
    resetForm();
  };

  return (
    <>
      <h1 className="text-3xl text-green-500 font-bold">
        Tailwind Test - Hello TechCare!
      </h1>

      {/* Counter Section */}
      <div className="my-8 p-6 bg-gray-100 rounded-lg">
        <h1 className="text-3xl text-blue-500 font-bold">Zustand Test</h1>
        <h2 className="text-2xl text-red-500 font-bold mb-4">
          Counter: {count}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* React Query Test Section */}
      <div className="my-8 p-6 bg-blue-100 rounded-lg">
        <h2 className="text-2xl text-blue-600 font-bold mb-4">
          React Query Test
        </h2>
        {isLoading && <p className="text-gray-600">Loading posts...</p>}
        {isError && (
          <p className="text-red-600">
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        {posts && (
          <div className="space-y-4">
            {posts.map((post: { id: number; title: string; body: string }) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded border border-blue-300"
              >
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-gray-700">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* React Hook Form Test Section */}
      <div className="my-8 p-6 bg-purple-100 rounded-lg">
        <h2 className="text-2xl text-purple-600 font-bold mb-4">
          React Hook Form Test
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 rounded border border-purple-300"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded border border-purple-300"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Submit
          </button>
        </form>

        {submittedForm && (
          <div className="mt-4 p-4 bg-white rounded border border-purple-300">
            <p className="font-semibold">Submitted Data:</p>
            <p className="text-sm text-gray-700">Name: {submittedForm.name}</p>
            <p className="text-sm text-gray-700">
              Email: {submittedForm.email}
            </p>
          </div>
        )}
      </div>

      <h1 className="text-3xl text-red-500 font-bold">Recharts Test</h1>

      <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="purple"
          strokeWidth={2}
          name="My data series name"
        />
        <XAxis dataKey="name" />
        <YAxis
          width="auto"
          label={{ value: "UV", position: "insideLeft", angle: -90 }}
        />
        <Legend align="right" />
        {/* <RechartsDevtools /> */}
      </LineChart>

      <div className="ticks"></div>
    </>
  );
}

export default App;
