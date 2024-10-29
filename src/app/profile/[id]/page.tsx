export default function profileId({params}:any){
    return(
        <div className="bg-gradient-to-br from-pink-100 via-white to-blue-200 flex flex-col items-center justify-center min-h-screen py-2">
            
            <p className="text-4xl">Profile Page
                <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
        </div>
    )
}