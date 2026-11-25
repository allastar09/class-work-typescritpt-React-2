
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import axios from "axios";
import { Button } from "../components/ui/button";
import { useFormik } from "formik";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "../components/ui/input";

const Info = () => {
  const api = "https://to-dos-api.softclub.tj/api/to-dos";

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  async function get() {
    try {
      const { data } = await axios.get(api);
      setData(data.data);
    } catch (error) {
      console.error("problem with get info", error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${api}?id=${id}`);
      get();
    } catch (error) {
      console.error("problem with delete", error);
    }
  }

  async function post(values) {
    try {
      const formData = new FormData();

      formData.append("Name", values.name);
      formData.append("Description", values.description);

      values.images.forEach((image) => {
        formData.append("Images", image);
      });

      await axios.post(api, formData);

      get();
      formik.resetForm();
    } catch (error) {
      console.error("problem with post", error);
    }
  }

  // EDIT
  async function edit() {
    try {
      await axios.put(`${api}/${editId}`, {
        Name: name,
        Description: description,
      });

      get();

      setName("");
      setDesc("");
      setEditId(null);
    } catch (error) {
      console.error("problem with edit", error);
    }
  }

  function openEdit(item) {
    setEditId(item.id);
    setName(item.name);
    setDesc(item.description);
  }

  useEffect(() => {
    get();
  }, []);

  const formik = useFormik({
    initialValues: {
      images: [],
      name: "",
      description: "",
    },

    onSubmit: (values) => {
      post(values);
    },
  });

  return (
    <div>

      <div className="ml-[300px] mt-[20px] flex gap-[20px]">

        <input
          type="text"
          className="border"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="border"
          placeholder="Description"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />

        {editId !== null && (
          <Button onClick={edit}>
            Update
          </Button>
        )}

      </div>

      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>
              Enter your name and description.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-[20px]"
          >
            <Input
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <Input
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <input
              type="file"
              multiple
              onChange={(e) => {
                formik.setFieldValue(
                  "images",
                  Array.from(e.target.files)
                );
              }}
            />

            <DialogFooter>
              <DialogClose>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">Send</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table className="mt-[100px] w-[80%] m-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.name}
              </TableCell>

              <TableCell>
                {invoice.description}
              </TableCell>

              <TableCell>
                {invoice.isCompleted ? "Active" : "Inactive"}
              </TableCell>

              <TableCell className="text-right">

                <Button
                  variant="destructive"
                  onClick={() => deleteUser(invoice.id)}
                >
                  Delete
                </Button>

                <Button
                  onClick={() => openEdit(invoice)}
                >
                  Edit
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Info;