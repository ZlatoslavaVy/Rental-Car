// import { Metadata } from "next";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchCarById } from "@/lib/api/notes"; // Функція має називатися fetchNoteById за ТЗ
import CarDetailsClient from "@/app/catalog/[carId]/CarDetails.client";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const car = await fetchCarById(id);
//   return {
//     title: `Car: ${car.model}`,
//     description: note.content.slice(0, 30),
//     openGraph: {
//       title: `Note: ${note.title}`,
//       description: note.content.slice(0, 30),
//       url: `https://08-zustand-tawny-mu.vercel.app/notes/${id}`,
//       images: [
//         {
//           url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//           width: 1200,
//           height: 630,
//           alt: note.title,
//         },
//       ],
//     },
//   };
// }

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
}
