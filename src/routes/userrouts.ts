import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { type } from "os";
import { usercreatcont } from "../controller/userCONT";

const Users=Type.Object({
    id:Type.String({format:"uuid"}),
    name:Type.String(),
    phone:Type.String(),
});
type Users=Static<typeof Users>;

export let users:Users[]=[
    {id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",name:"user1",phone:"1234567890"},
];
export default async function (server:FastifyInstance) {
    //create user and return created user message
    server.route({
        method: "POST",
        url: "/usercreate",
        schema: {
            summary: "create a new user",
            tags: ["user"],
            body: Users,
        },
        handler: async (request, reply) => {
            const newuser:any=request.body;
            return usercreatcont(users,newuser);
        },
    });
    //

}
