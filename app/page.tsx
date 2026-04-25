import { redirect } from 'next/navigation';

export default function RootPage() {
    // During `output: "export"`, Next.js will generate an index.html file 
    // at the root with a `<meta http-equiv="refresh" ...>` tag 
    // that automatically redirects users to your default language path.
    redirect('/en');
}
